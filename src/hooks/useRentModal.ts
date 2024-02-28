import { Listing } from "@prisma/client";
import { create } from "zustand";

import { LocationType } from "@/types";

interface RentModalStore {
  isOpen: boolean,
  data?: Listing & {location: LocationType},
  onOpen: (data?: Listing & {location: LocationType}) => void,
  onClose: () => void
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: (data) => {
    if(data){
      set({data})
    }
    set({isOpen: true})
  },
  onClose: () => set({isOpen: false}) 
}))

export default useRentModal