import {FC, useEffect, useState} from "react";
import {Layout} from "../components/atoms/Layout.tsx";
import {Card, Col, Pagination, Row, Segmented, Select} from "antd";
import GameService from "../services/GameService.ts";
import {Game} from "../models/Game.ts";
import {useNavigate} from "react-router-dom";

const Home: FC = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [page, setPage] = useState(1)
    const [games, setGames] = useState<Game[]>([])
    const indexOfLastItem = page * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const currentItems = games.slice(indexOfFirstItem, indexOfLastItem);
    const categories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racist', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']

    useEffect(() => {
        GameService.getGames().then(response => setGames(response.data))
        setTimeout(()=> setIsLoading(false), 500)
    }, [])
    return (
        <Layout>
            <Row>
                <Col>
                    <Segmented
                        onChange={(value) => {
                            GameService.getGamesByPlatform(value.toString()).then(response => setGames(response.data))
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
            <Row>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <Select

                        style={{ width: "100%", marginBottom: "20px" }}
                        options={categories.map(category => {return {value: category, label: category}})}
                    />
                </Col>
            </Row>
            <Row className="row-wrapper" gutter={24}>
                {currentItems.map((game) => (
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6} key={game.id}>
                        <Card
                            loading={isLoading}
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
                    <Pagination showSizeChanger={false} style={{textAlign:"center"}} defaultCurrent={1} total={games.length} onChange={(page) =>{
                        setPage(page)
                        setIsLoading(true)
                        setTimeout(()=> setIsLoading(false), 500)
                    }}/>
                </Col>
            </Row>
        </Layout>
    );
};

export default Home;
