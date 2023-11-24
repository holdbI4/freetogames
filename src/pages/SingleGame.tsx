import {Layout} from "../components/atoms/Layout.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import GameService from "../services/GameService.ts";
import {SingleGame as SinglegameResponse} from "../models/Game.ts";
import {Col, Row, Image, Card, Descriptions, DescriptionsProps, Carousel} from "antd";



const SingleGame = () => {
    const params = useParams()
    const [game, setGame] = useState<SinglegameResponse>()

    const infoItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Genre',
            children: <p>{game?.genre}</p>,
            span: 12,
        },
        {
            key: '2',
            label: 'Short Description',
            children: <p>{game?.description}</p>,
            span: 12,
        },
        {
            key: '3',
            label: 'Game URL',
            children: <a>{game?.game_url}</a>,
            span: 12,
        },
        {
            key: '4',
            label: 'Platform',
            children: <p>{game?.platform}</p>,
            span: 12,
        },
        {
            key: '5',
            label: 'Release Date',
            children: <p>{game?.release_date}</p>,
            span: 12,
        },
        {
            key: '6',
            label: 'Publisher',
            children: <p>{game?.publisher}</p>,
            span: 12,
        },
        {
            key: '7',
            label: 'Developer',
            children: <p>{game?.developer}</p>,

        },

    ];
    const otherItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'OS',
            children: <p>{game?.minimum_system_requirements.os}</p>,
            span: 12,
        },
        {
            key: '2',
            label: 'Processor',
            children: <p>{game?.minimum_system_requirements.processor}</p>,
            span: 12,
        },
        {
            key: '3',
            label: 'Memory',
            children: <p>{game?.minimum_system_requirements.memory}</p>,
            span: 12,
        },
        {
            key: '4',
            label: 'Grapgics',
            children: <p>{game?.minimum_system_requirements.graphics}</p>,
            span: 12,
        },
        {
            key: '5',
            label: 'Storage',
            children: <p>{game?.minimum_system_requirements.storage}</p>,
            span: 12,
        },


    ];


    console.log(params.gameId)
    useEffect(() => {
        GameService.getGameById(Number(params.gameId)).then(response => setGame(response.data))
    }, [params]);
    return (
        <Layout>

            <Row className="row-wrapper">
                <Col span={24}>
                    <div style={{position: "relative", color: "white"}}>
                        <Image alt={game?.title} className="img-wrapper" src={game?.thumbnail} width="100%" height="200px" preview={true}/>
                        <h1 style={{position: "absolute", bottom: "10px", left: "10px"}}>{game?.title}</h1>
                    </div>
                </Col>
                <Col span={24} className="mt-16">
                    <Card>
                        <Descriptions items={infoItems}/>
                    </Card>

                </Col>
                <Col span={24} className="mt-16">
                    <Card>
                       <Descriptions items={otherItems}/>
                    </Card>
                </Col>

                <Col span={24} className="mt-16">
                    <Carousel autoplay>
                        {game?.screenshots.map(img => {
                            return <Image
                                src={img.image}
                                alt={game?.title}
                                className="slider-img"
                                width="100%"
                                height="300px"
                            />
                        })}
                    </Carousel>
                </Col>

            </Row>

        </Layout>
    );
};

export default SingleGame;
