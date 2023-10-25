import React from 'react'

import getFavoriteListings from "@actions/getFavoriteListings"
import getCurrentUser from "@actions/getCurrentUser"

import EmptyState from "@components/EmptyState"
import WishListsClient from "./WishListsClient"

const WishListsPage = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser) return (
    <EmptyState 
      title="Unauthorized"
      subtitle="Please login"
    />
  )

  const listings = await getFavoriteListings()

  if(listings.length === 0) return (
    <EmptyState 
      title="No wishlists found"
      subtitle="Looks like you have no wishlist"
    />
  )

  return (
    <WishListsClient 
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default WishListsPage