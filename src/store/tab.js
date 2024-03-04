import Cookie from 'js-cookie'

export default {
    state:{
        isCollapse: false,//用于控制菜单收起or展开
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home',
            }
        ]//储存header面包屑的数据
    },
    mutations: {
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        SelecMenu(state,val) {
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                if( index === -1 ) {
                    state.tabsList.push(val)
                }
                // else {
                //     state.tabsList.splice(index, 1, val)
                // }
            }
        },
        closeTag(state,item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray, 'menuArray');
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}