import { TbBeach, TbMountain } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCampingTent, GiCaveEntrance, GiIsland } from 'react-icons/gi'
import { LiaSwimmingPoolSolid } from 'react-icons/lia'
import { MdCastle, MdFreeBreakfast, MdOutlineVilla } from 'react-icons/md'
import { BsFire } from 'react-icons/bs'
import { FaSkiing, FaSnowflake } from 'react-icons/fa'
import { IoDiamond } from 'react-icons/io5'

// TODO: Separate Categories and Amenities list
export const CATEGORIES_LIST = [
  {
    label: 'Beachfront',
    icon: TbBeach,
    description: "This property is close to the beach!"
  },
  {
    label: 'Amazing pools',
    icon: LiaSwimmingPoolSolid,
    description: "This property has amazing pools!"
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: "This property is modern!"
  },
  {
    label: 'Camping',
    icon: GiCampingTent,
    description: "This property has camping activities!"
  },
  {
    label: 'Bed & breakfasts',
    icon: MdFreeBreakfast,
    description: "This property offers delicious breakfasts!"
  },
  {
    label: 'Trending',
    icon: BsFire,
    description: "This property trending right now!"
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: "This property is in the countryside!"
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: "This property is on an island!"
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: "This property is close to a lake!"
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: "This property has skiing activities!"
  },
  {
    label: 'Arctic',
    icon: FaSnowflake,
    description: "This property is in the arctic!"
  },
  {
    label: 'Castles',
    icon: MdCastle,
    description: "This property is in a castle!"
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: "This property is in a cave!"
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: "This property is in the desert!"
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: "This property is in a barn!"
  },
  {
    label: 'Luxe',
    icon: IoDiamond,
    description: "This property is luxurious!"
  },
  
]