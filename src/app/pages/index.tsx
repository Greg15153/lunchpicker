import { Card, Col, List, Row } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import { useFetch } from '../hooks/useFetch'
import useLocation from '../hooks/useLocation'

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
    },
    {
        id: 3,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 4,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 5,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 6,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 7,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 8,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 9,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 10,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 11,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 12,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 13,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 14,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 15,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 16,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    },
    {
        id: 17,
        name: 'Burger King',
        thumbnail: 'https://pbs.twimg.com/profile_images/1229180816435142660/MLoubJPL_400x400.jpg'
    },
    {
        id: 18,
        name: 'McDonalds',
        thumbnail: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png'
    }
]

const onRenderCell = (item: Business): JSX.Element => (
    <List.Item>
        <Card style={{ width: 140 }} hoverable cover={<img src={item.thumbnail} />}>
            <Card.Meta title={item.name} />
        </Card>
    </List.Item>
)

const Home = (): React.ReactElement => {
    const [location, setLocation] = useState<string>()
    const coordinates = useLocation()
    const { state, fetchData } = useFetch<boolean>('healthcheck')
    //const reverseGeocode = (long, lat) => useFetch<string>(`geocode/reverse?latitude=${long}&longitude=${lat}`)

    useEffect(() => {
        if (!coordinates) {
            return
        }

        fetchData().then(() => {
            console.log(state)
            if (state.isError) {
                console.log(state)
                console.log('Error occured')
            } else {
                setLocation('Hello')
            }
        })
    }, [setLocation, coordinates])

    return (
        <Row>
            <Col span={12} offset={6}>
                <List
                    grid={{ gutter: 10, xs: 1, sm: 2, md: 4, lg: 6 }}
                    itemLayout="horizontal"
                    bordered={false}
                    size="small"
                    dataSource={items}
                    renderItem={onRenderCell}
                />
            </Col>
        </Row>
    )
}

export default Home
