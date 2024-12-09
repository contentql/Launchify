'use client'

import { Project, Service } from '@payload-types'
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  Ban,
  Box,
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utils/cn'
import { formateDateByDays } from '@/utils/daysAgo'

const calculateNodePositions = (
  services: Service[],
  containerWidth: number,
  containerHeight: number,
) => {
  const nodeWidth = 150 // Node width
  const nodeHeight = 100 // Node height
  const marginX = 150 // Horizontal margin between nodes
  const marginY = 100 // Vertical margin between nodes

  // Max nodes per row
  const rowCapacity = Math.ceil(Math.sqrt(services.length))
  // Total rows needed
  const totalRows = Math.ceil(services.length / rowCapacity)

  // Total grid dimensions
  const totalGridWidth = rowCapacity * nodeWidth + (rowCapacity - 1) * marginX
  const totalGridHeight = totalRows * nodeHeight + (totalRows - 1) * marginY

  // Center grid inside the container
  const startX = (containerWidth - totalGridWidth) / 2
  const startY = (containerHeight - totalGridHeight) / 2

  const positions = services.map((_, index) => {
    const row = Math.floor(index / rowCapacity)
    const col = index % rowCapacity

    const x = startX + col * (nodeWidth + marginX)
    const y = startY + row * (nodeHeight + marginY)

    return { x, y }
  })

  return positions
}

const ReactNodes = ({
  children,
  services,
  slug,
}: {
  children: React.ReactNode
  services: Service[]
  slug: any
}) => {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 800
  const containerHeight =
    typeof window !== 'undefined' ? window.innerHeight : 600

  const initialPositions = calculateNodePositions(
    services,
    containerWidth,
    containerHeight,
  )

  const initialNodes = services?.map((service, index) => ({
    id: service.id,
    position: initialPositions[index],
    data: { ...service },
    type: 'custom',
  }))

  const updatedNodes = initialNodes?.map(node =>
    node.id === slug.at(-1)
      ? {
          ...node,
          position: { x: 50, y: 250 }, // Keep the highlighted node in a specific position
        }
      : node,
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(updatedNodes!)

  const deploymentStatus = {
    DEPLOYING: (
      <span title='Deploying' className='text-info'>
        <CircleDashed size={16} />
      </span>
    ),
    ERROR: (
      <span title='Error' className='text-error'>
        <Ban size={16} />
      </span>
    ),
    SUCCESS: (
      <span title='Success' className='text-success'>
        <CircleCheckBig size={16} />
      </span>
    ),
    NOT_YET_DEPLOYED: (
      <span title='Not yet deployed' className='text-warning'>
        <CircleAlert size={16} />
      </span>
    ),
  }

  const TestComponent = ({ data }: any) => {
    return (
      <div
        className={cn(
          'relative flex h-32 w-full flex-col items-start justify-between overflow-hidden rounded-md border border-base-content/20 bg-base-200 p-4 shadow-lg drop-shadow-md md:w-64',
          data?.id === slug?.at(-1)
            ? 'border-[1.5px] border-primary/50 bg-base-200'
            : '',
        )}>
        <Link
          className='flex h-full w-full flex-col justify-between'
          href={`/dashboard/project/${(data?.project as Project)?.id}/service/${data?.id}`}>
          <div className='space-y-0'>
            <div className='inline-flex items-center gap-x-2'>
              {data?.icon ? (
                <Image src={data?.icon} alt='' width={20} height={20} />
              ) : (
                <Box className='text-base-content/80' size={20} />
              )}
              <h4 className='line-clamp-1 text-lg font-bold capitalize text-base-content'>
                {data?.serviceName}
              </h4>
            </div>
            {data?.serviceDomains?.length! > 0 && (
              <p className='line-clamp text-sm text-base-content/80'>
                {data?.serviceDomains?.at(0)?.domainUrl}
              </p>
            )}
          </div>
          <div className='inline-flex items-center gap-x-2'>
            {data?.deploymentStatus &&
              //@ts-ignore
              deploymentStatus[data?.deploymentStatus!]}
            <p className='text-sm text-base-content/80'>
              {data?.updatedAt
                ? formateDateByDays(data?.updatedAt)
                : formateDateByDays(data?.createdAt)}
            </p>
          </div>
        </Link>
      </div>
    )
  }

  const nodeTypes = {
    custom: TestComponent,
  }

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          className='z-10'>
          <div>{children}</div>
          <Background className='bg-base-100 text-base-content/80' />
          <Controls
            position='bottom-left'
            className='bg-base-100 text-base-content/80'
            style={{
              backgroundColor: 'blue',
            }}
          />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}

export default ReactNodes
