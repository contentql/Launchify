import { NextRequest } from 'next/server'

import { addClient, removeClient } from '@/lib/clients'

export const maxDuration = 60000 // Max duration for the stream in milliseconds (e.g., 1 minute)

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const syncParams = await context.params
  const id = syncParams.id.toString()

  // Create a TransformStream which provides readable and writable streams
  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()
  const encoder = new TextEncoder()

  // Flag to track if the stream is still open
  let streamOpen = true

  try {
    // Write an initial message to the client indicating that the stream has started
    writer.write(encoder.encode('data: { "started": true }\n\n'))

    // Use the provided client ID to manage the client connection
    const clientId = id

    // Add the client to the tracking system with the writable stream
    addClient(clientId, writer)

    // Set up a keep-alive mechanism that sends a ping every 30 seconds
    const keepAliveInterval = setInterval(() => {
      if (streamOpen) {
        writer.write(encoder.encode(': keep-alive\n\n')) // Comment line for Server-Sent Events (SSE) keep-alive
      } else {
        clearInterval(keepAliveInterval) // Stop sending keep-alives if the stream is closed
      }
    }, 30000)

    // Set a timeout to automatically close the stream after the maximum duration
    const timeout = setTimeout(() => {
      if (streamOpen) {
        removeClient(clientId) // Remove the client from the tracking system
        writer.close() // Close the writable stream
        streamOpen = false // Mark the stream as closed
      }
    }, maxDuration)

    // Handle request aborts (e.g., if the client disconnects)
    req.signal.addEventListener('abort', () => {
      if (streamOpen) {
        clearInterval(keepAliveInterval) // Clear the keep-alive interval
        clearTimeout(timeout) // Clear the timeout
        removeClient(clientId) // Remove the client from the tracking system
        writer.close() // Close the writable stream
        streamOpen = false // Mark the stream as closed
      }
    })
  } catch (error) {
    // Log any errors that occur and close the stream in case of failure
    console.error('Error handling SSE stream:', error)
    if (streamOpen) {
      writer.close() // Close the writable stream
      streamOpen = false // Mark the stream as closed
    }
  }

  // Return a Response object with the readable stream, configured for SSE
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream', // Specify the content type for SSE
      'Cache-Control': 'no-cache', // Prevent caching of the SSE response
      Connection: 'keep-alive', // Keep the connection open
    },
  })
}
