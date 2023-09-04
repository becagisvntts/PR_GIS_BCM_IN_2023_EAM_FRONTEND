// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'axios'

// ** Type Import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch, useAppSelector } from 'src/store'
import MenuService from 'src/services/eam/MenuService'
import { useDispatch } from 'react-redux'
import { updateMenu } from 'src/store/MenuSlice'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<VerticalNavItemsType>([])

  // const menu: [] = useSelector((state: RootState) => state.menu.menu)

  const dispatch = useAppDispatch()
  let menu = useAppSelector(state => state.menu.menu)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    if (menu.length == 0) {
      menu = await MenuService.fetchMenu()
      dispatch(updateMenu(menu))
    }

    const tmpMenu = menu.map((el: any) => {
      return buildTree(el)
    })
    setMenuItems(tmpMenu)
  }

  const buildTree: any = (node: any) => {
    if (node.menuType == 'folder') {
      const children = node.children.map((childNode: any) => {
        return buildTree(childNode)
      })

      return {
        title: node.objectDescription,
        icon: 'material-symbols:folder',
        children: children
      }
    }
    return {
      title: node.objectDescription,
      path: `/${node.menuType}/${node.objectTypeName}`,
      icon: node.menuType == 'dashboard' ? 'ant-design:home-filled' : 'bxs:file'
    }
  }

  // const getPathByNode = (node: any) => {
  //   let path = `/${node.menuType}/${node.objectTypeName}`
  //   return path
  // }

  return { menuItems }
}

export default ServerSideNavItems
