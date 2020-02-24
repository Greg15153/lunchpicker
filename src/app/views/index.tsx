import React, { FunctionComponent } from 'react'
import { SearchBox, List, ITheme, getTheme, mergeStyleSets } from 'office-ui-fabric-react'
import useLocation from '../hooks/useLocation'
import Layout from './layout'

interface Business {
    id: number
    name: string
    thumbnail: string
}

const items: Business[] = [
    {
        id: 1,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 2,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    }
]

const theme: ITheme = getTheme()
const { palette, fonts } = theme

const classNames = mergeStyleSets({
    listGridExample: {
        overflow: 'hidden',
        fontSize: 0,
        position: 'relative'
    },
    listGridExampleTile: {
        textAlign: 'center',
        outline: 'none',
        position: 'relative',
        float: 'left',
        background: palette.neutralLighter,
        selectors: {
            'focus:after': {
                content: '',
                position: 'absolute',
                left: 2,
                right: 2,
                top: 2,
                bottom: 2,
                boxSizing: 'border-box',
                border: `1px solid ${palette.white}`
            }
        }
    },
    listGridExampleSizer: {
        paddingBottom: '100%'
    },
    listGridExamplePadder: {
        position: 'absolute',
        left: 2,
        top: 2,
        right: 2,
        bottom: 2
    },
    listGridExampleLabel: {
        background: 'rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        position: 'absolute',
        padding: 10,
        bottom: 0,
        left: 0,
        width: '100%',
        fontSize: fonts.small.fontSize,
        boxSizing: 'border-box'
    },
    listGridExampleImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    }
})

const onRenderCell = (item: Business): JSX.Element => (
    <div
        className={classNames.listGridExampleTile}
        data-is-focusable={true}
        style={{
            width: 100
        }}>
        <div className={classNames.listGridExampleSizer}>
            <div className={classNames.listGridExamplePadder}>
                <img src={item.thumbnail} className={classNames.listGridExampleImage} />
                <span className={classNames.listGridExampleLabel}>{item.name}</span>
            </div>
        </div>
    </div>
)

const Index: FunctionComponent = (): JSX.Element => {
    const location = useLocation()

    console.log(location)
    return (
        <Layout>
            <SearchBox placeholder="Location" />
            <List className={classNames.listGridExample} items={items} onRenderCell={onRenderCell} />
        </Layout>
    )
}
export default Index
