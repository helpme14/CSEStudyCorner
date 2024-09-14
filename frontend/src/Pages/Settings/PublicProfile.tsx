import {useState, useContext, useEffect, useRef} from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import SideSettings from './SideSettings'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {Skeleton} from '@/components/ui/skeleton'
import AuthContext from '../../context/AuthContext'
import {FiUpload} from 'react-icons/fi' // Importing upload icon from react-icons

const PublicProfile = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const {user, fetchProfileData, updateProfile} = authContext

  // State for form data and loading
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile: {
      age_bracket: '',
      bio: ''
    }
  })

  const [loading, setLoading] = useState(true) // Loading state
  const fetchStartTime = useRef<number | null>(null) // Track start time

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchStartTime.current = Date.now() // Set fetch start time
        await fetchProfileData()
        const fetchDuration =
          Date.now() - (fetchStartTime.current || Date.now())
        const minDuration = 2000 // Minimum delay of 2 seconds

        // Wait for minDuration if necessary
        if (fetchDuration < minDuration) {
          setTimeout(() => setLoading(false), minDuration - fetchDuration)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching profile data', error)
        setLoading(false)
      }
    }

    if (import.meta.env.VITE_NODE_ENV !== 'development') {
      fetchData()
    } else {
      // Simulate loading delay in development
      setTimeout(() => {
        setLoading(false)
      }, 2000) // 2 seconds delay for demo
    }
  }, [fetchProfileData])

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        profile: {
          age_bracket: user?.profile?.age_bracket || '',
          bio: user?.profile?.bio || ''
        }
      })
    }
  }, [user])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = event.target
    if (name in formData.profile) {
      setFormData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value
        }
      }))
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const username = formData.first_name + ' ' + formData.last_name

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const getInitials = (name: string) => {
    const nameParts = name.split(' ')
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
    return initials
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form Data Submitted:', formData)

    const profileData = {
      ...(formData.profile.age_bracket && {
        age_bracket: formData.profile.age_bracket
      }),
      bio: formData.profile.bio
    }

    try {
      await updateProfile({
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        profile: profileData
      })
    } catch (error) {
      console.error('Error updating profile', error)
    }
  }

  return (
    <div className="flex w-full h-full sm:h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
          <div className="container py-20 mx-auto">
            <Box sx={{flexGrow: 1}}>
              <div className="flex flex-col gap-2 pb-6">
                <span className="text-3xl font-bold">Settings</span>
                <p className="text-base text-gray-500 dark:text-white">
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} className="!pl-0">
                  <SideSettings />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <div className="flex flex-col gap-2 py-4">
                    <span className="text-xl font-medium">Profile</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      This is how others will see you on the site.
                    </p>
                    

                    <div className="relative flex flex-col gap-3 ">
                      {loading ? (
                        <>
                          {/* For Username Label */}
                          <Skeleton
                            width="w-1/4"
                            height="h-6"
                            className="mb-1"
                          />{' '}
                          {/* Label skeleton */}
                          <Skeleton
                            width="w-full"
                            height="h-10"
                            className="mb-2"
                          />{' '}
                          {/* Input skeleton */}
                          {/* For Email Label */}
                          <Skeleton
                            width="w-1/4"
                            height="h-6"
                            className="mb-1"
                          />{' '}
                          {/* Label skeleton */}
                          <Skeleton
                            width="w-full"
                            height="h-10"
                            className="mb-2"
                          />{' '}
                          {/* Input skeleton */}
                          {/* For Bio Label */}
                          <Skeleton
                            width="w-1/4"
                            height="h-6"
                            className="mb-1"
                          />{' '}
                          {/* Label skeleton */}
                          <Skeleton width="w-full" height="h-24" />{' '}
                          {/* Textarea skeleton */}
                        </>
                      ) : (
                        <form
                          className="flex flex-col gap-3"
                          onSubmit={handleSubmit}>
                          <div className="flex flex-col gap-3 pt-4">
                            <Label
                              htmlFor="username"
                              className="font-medium text-medium">
                              Username
                            </Label>
                            <Input
                              type="text"
                              id="username"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex flex-col gap-3 pt-4">
                            <Label
                              htmlFor="email"
                              className="font-medium text-medium">
                              Email Address
                            </Label>
                            <Input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label
                              htmlFor="bio"
                              className="font-medium text-medium">
                              Bio
                            </Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={formData.profile.bio}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="py-4">
                            <Button type="submit" className="mt-4">
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PublicProfile
