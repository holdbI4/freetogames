import {FC, ReactNode} from "react";
import {Col, Layout as LayoutComponent, Row} from "antd";
import image from "../../assets/logo.svg"

interface LayoutProps {
    children: ReactNode
}

const {Content, Header} = LayoutComponent;


export const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <LayoutComponent>
            <Header className="header">
                <Row className="row-wrapper">
                    <Col xs={22} sm={22} md={18} lg={16} xl={16} xxl={14}>
                        <img src={image} style={{verticalAlign:"middle", width:"50px", height:"50px"}}/>
                        <a href="/" style={{marginLeft:"10px"}}>FreeToGame</a>
                    </Col>
                </Row>
            </Header>
           <LayoutComponent>
               <Content style={{minHeight: "100vh", padding: "20px 0"}}>
                   <Row className="row-wrapper">
                       <Col xs={22} sm={22} md={18} lg={16} xl={16} xxl={14}>

                           {children}
                       </Col>
                   </Row>
               </Content>

           </LayoutComponent>
        </LayoutComponent>
    );
};
