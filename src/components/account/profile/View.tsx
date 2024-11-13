import { SidebarView } from '../common/Sidebar'
import { User } from '@payload-types'

import Container from '@/components/common/Container'

import ProfileForm from './ProfileForm'

interface Props {
  user: User
}

const ProfileView: React.FC<Props> = ({ user }) => {
  return (
    <Container>
      <div className='flex w-full flex-col gap-5 bg-base-100 md:flex-row'>
        <SidebarView user={user} />
        <main className='min-h-screen w-full pt-4 md:pt-24 '>
          <ProfileForm user={user} />
        </main>
      </div>
    </Container>
  )
}

export default ProfileView
