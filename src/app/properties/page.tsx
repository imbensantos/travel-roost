import React from 'react'

import getCurrentUser from '@actions/getCurrentUser'

import EmptyState from '@components/EmptyState'
import PropertiesClient from './PropertiesClient'
import getListings from '@actions/getListings'

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser) return (
    <EmptyState 
      title="Unauthorized"
      subtitle="Please login"
    />
  )

  const listings = await getListings({userId: currentUser.id})

  if(listings.length === 0) return (
    <EmptyState 
      title="No properties found"
      subtitle="Look like you have no properties."
    />
  )

  return (
    <PropertiesClient 
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default PropertiesPage