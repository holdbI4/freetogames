import {FC} from "react";
import {Col, Row, Spin} from "antd";
export const Loader : FC = () => {
    return (
        <>
            <Row className="flex" style={{justifyContent:"center"}}>
                <Col span={12}>
                    <Spin/>
                </Col>
            </Row>


        </>
    );
};
