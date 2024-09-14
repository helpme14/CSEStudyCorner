import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SideSettings from './SideSettings'
import {Divider} from '@mui/material'
import React, {useState, useContext, useEffect} from 'react'
import {CameraAlt} from '@mui/icons-material'
import {Button} from '@/components/ui/button'
import AuthContext from '../../context/AuthContext'

const ProfilePicture = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const {user, fetchProfileData, updateProfile} = authContext

  // State for form data and loading
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const username = formData.first_name + ' ' + formData.last_name

  const handleUpload = () => {
    if (selectedFile) {
      // Handle the image upload logic here (e.g., send it to the server)
      console.log('Uploading image:', selectedFile)
    }
  }

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

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || ''
      })
    }
  }, [user])

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
          <div className="container py-20">
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
                    <span className="text-xl font-medium">Profile Picture</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      Update your profile picture to personalize your account.
                      This image will be visible across your account and help
                      others recognize you. Ensure the picture is clear and
                      appropriate for all users.
                    </p>
                    <Divider className="pt-4" />

                    <div className="flex flex-col items-start">
                      {/* Profile Image or Initials */}
                      <div className="relative w-24 h-24">
                        <div className="w-full h-full overflow-hidden border-2 border-gray-300 rounded-full dark:border-gray-500">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile Preview"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                              <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                                {getInitials(username)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Camera Icon for Upload - Positioned at bottom-right */}
                        <label className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 p-1 bg-gray-700 rounded-full shadow-lg cursor-pointer hover:bg-gray-500">
                          <CameraAlt className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Button Aligned Below the Picture */}
                      <Button className="mt-3" onClick={handleUpload}>
                        Update Photo
                      </Button>
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

export default ProfilePicture
