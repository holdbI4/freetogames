import {FC, useEffect} from "react";
import {Layout} from "../components/atoms/Layout.tsx";
import {Button, Card, Col, Dropdown, MenuProps, Pagination, Row, Segmented, Select} from "antd";
import GameService from "../services/GameService.ts";
import {gameSorts} from "../models/Game.ts";
import {useNavigate} from "react-router-dom";
import {FilterOutlined} from "@ant-design/icons";
import homeStore from "../store/Home.ts";
import {observer} from "mobx-react-lite";


const Home: FC = observer( ()=> {
    const navigate = useNavigate()



    const indexOfLastItem = homeStore.page * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const currentItems = homeStore.games.slice(indexOfFirstItem, indexOfLastItem);
    const categories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']

    const onDropdownItemClick = (gameSort:gameSorts) =>{
        GameService.getGameBySort(gameSort).then(response => homeStore.setGames(response.data))
    }
    useEffect(() => {
        GameService.getGames().then(response => homeStore.setGames(response.data))
        setTimeout(()=> homeStore.setIsloading(false), 500)
    }, [])

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: "alphabetical",
            onClick:()=> onDropdownItemClick("alphabetical"),
        },


        {
            key: '2',
            label: "release-date",
            onClick:()=> onDropdownItemClick("release-date"),
        },
        {
            key: '3',
            label: "popularity",
            onClick:()=> onDropdownItemClick("popularity"),
        },
        {
            key: '4',
            label: "relevance",
            onClick:()=> onDropdownItemClick("relevance"),
        },
    ];
    return (
        <Layout>
            <Row>
                <Col>
                    <Segmented
                        onChange={(value) => {
                            GameService.getGamesByPlatform(value.toString()).then(response => homeStore.setGames(response.data))
                        }}
                        options={[
                            {
                                value:'all',
                                label:'All'
                            },
                            {
                                value:'pc',
                                label:'PC'
                            },
                            {
                                value:'browser',
                                label:'Browser'
                            }
                        ]}
                        style={{marginBottom: "20px"}}
                    />
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Select
                        // defaultValue={categories[0]}
                        // defaultActiveFirstOption
                        style={{ width: "100%", marginBottom: "20px" }}
                        options={categories.map(category => {return {value: category, label: category}})}
                        onChange={(value) => {
                            GameService.getGameByCategory(value).then(
                                response => homeStore.setGames(response.data)
                            )
                        }}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Dropdown menu={{ items }}>
                        <Button
                            icon={<FilterOutlined />}
                            onClick={(e) => e.preventDefault()}
                        />

                    </Dropdown>
                </Col>
            </Row>
            <Row className="row-wrapper" gutter={24}>
                {currentItems.map((game) => (
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={game.id}>
                        <Card
                            loading={homeStore.isLoading}
                            style={{marginBottom: "10px"}}
                            hoverable
                            cover={<img alt={game.title} src={game.thumbnail} />}
                            onClick={()=> navigate(`/game/${game.id}`)}
                        >
                            <Card.Meta title={game.title} description={game.publisher} />
                        </Card>
                    </Col>
                ))}

            </Row>

            <Row className="row-wrapper">
                <Col xs={24} sm={24} md={16} lg={16}>
                    <Pagination showSizeChanger={false} style={{textAlign:"center"}} defaultCurrent={1} total={homeStore.games.length} onChange={(page) =>{
                        homeStore.setPage(page)
                        homeStore.setIsloading(true)
                        setTimeout(()=> homeStore.setIsloading(false), 500)
                    }}/>
                </Col>
            </Row>
        </Layout>
    );
});

export default Home;
