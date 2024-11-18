import axios from 'axios'

const DNS_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS']

interface DomainCheckResponse {
  isAvailable: boolean
  message: string
}

export const isDomainAvailable = async (
  domain: string,
): Promise<DomainCheckResponse> => {
  try {
    // Loop through all DNS record types
    for (const type of DNS_TYPES) {
      const response = await axios.get('https://cloudflare-dns.com/dns-query', {
        headers: { Accept: 'application/dns-json' },
        params: {
          name: domain,
          type: type,
        },
      })

      // If any DNS records exist, return false (domain is in use)
      if (response.data.Answer && response.data.Answer.length > 0) {
        return {
          isAvailable: false,
          message: `${type} record found for ${domain}. The domain or subdomain is in use.`,
        }
      }
    }

    // If no records are found for any type, domain is available
    return {
      isAvailable: true,
      message: `No DNS records found for ${domain}. The domain or subdomain is available.`,
    }
  } catch (error: any) {
    console.error('Error checking domain DNS records:', error)
    // In case of any error, return an appropriate message and assume it's unavailable
    return {
      isAvailable: false,
      message: `Error checking DNS records for ${domain}: ${error.message}. Assuming domain is unavailable.`,
    }
  }
}
