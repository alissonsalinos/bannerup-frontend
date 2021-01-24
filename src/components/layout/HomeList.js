import React,  {useState, useEffect}  from 'react'
import Axios from "axios";
import 'rbx/index.css'
import BreadCrump from './BreadCrump'
import {useHistory} from 'react-router-dom';
import {Container, Notification, Table, Button } from 'rbx';
import Moment from 'react-moment';
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
import 'moment-timezone';
import axios from 'axios';

export default function HomeList() {

    const [listCampaign, setListCampaign] = useState();  
    const history = useHistory();
    const [error, setError] = useState(0);
    const [success, setSuccess] = useState(0);

    const getUsers = async () => {
        const headers = {"x-auth-token": localStorage.getItem("auth-token") }
        const listCampaign = await Axios.get(`${process.env.REACT_APP_API_URL}/campaigns/all`, {headers : headers})
        setListCampaign(listCampaign.data)
    }

    useEffect(() => {
        getUsers();
    }, [])
        
    console.log(listCampaign)
    const deactivate = async (id) => {  
         try {
             const headers = {"x-auth-token": localStorage.getItem("auth-token") }
             const updateStatus = await axios.patch(`${process.env.REACT_APP_API_URL}/campaigns/updatestatus/`+id, { active: 'N' }, {headers: headers})
             console.log(updateStatus.data)
             getUsers()
             setSuccess("Campanha desativada com sucesso!")
             setTimeout(() => {
                setSuccess(0)
               }, 2500);
         } catch (err) {
             console.log("Error: ", err)
         }
     }

     const editLink = (id) => {
        history.push(`/edit?id=${id}`);
     }


    return (
        <React.Fragment>
             {(error !== 0) && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            {(success !== 0) && ( 
                <SuccessNotice message={success} clearError={() => setError(undefined)} style={{position: 'fixed!important'}} />
            )}
            <Container fluid style={{marginTop: '15px', marginBottom: '15px'}}>
                <BreadCrump page="Lista de Campanhas Ativas"/>
            </Container>    
            <Container fluid >
                <Notification className="table__mobile">
            
                        <Table fullwidth hoverable>
                            <Table.Head>
                                <Table.Row>
                                <Table.Heading>Campanha</Table.Heading>
                                <Table.Heading>Veiculação</Table.Heading>
                                <Table.Heading>Início</Table.Heading>
                                <Table.Heading>Fim</Table.Heading>
                                <Table.Heading>&nbsp;</Table.Heading>
                                <Table.Heading>&nbsp;</Table.Heading>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {listCampaign ? (
                                listCampaign.map((campaign, i) => (
                                    
                                <Table.Row key={i}>
                                    <Table.Cell style={{verticalAlign:'middle'}}>{campaign.title}</Table.Cell>
                                    <Table.Cell style={{verticalAlign:'middle'}}>
                                        {(campaign.pEmpresas === "true") ? `Portal Empresas` : ""}
                                        {(campaign.pEmpresas === "true") ? `, ` : ""}
                                        {(campaign.pUsuarios === "true") ? `Portal Usuários` : ""}
                                        {(campaign.pUsuarios === "true") ? `, ` : ""}
                                        {(campaign.pRedes === "true") ?    `Portal Redes` : ""}
                                        {(campaign.pRedes === "true") ?    `, ` : ""}
                                        {(campaign.pInst === "true") ?     `Site Institucional` : ""}
                                        {(campaign.pInst === "true") ?     `, ` : ""}
                                        {(campaign.app === "true") ? `APP` : ""}
                                    </Table.Cell>
                                    <Table.Cell style={{verticalAlign:'middle'}}><Moment format="DD/MM/YYYY">{campaign.startDate}</Moment></Table.Cell>
                                    <Table.Cell style={{verticalAlign:'middle'}}><Moment format="DD/MM/YYYY">{campaign.endDate}</Moment></Table.Cell>
                                    <Table.Cell><Button tooltip="Editar campanha" className="button is-outlined is-info icon--button" color="info" onClick={() => editLink(campaign._id)}><i className="fas edit--custom fa-2x fa-edit"></i></Button></Table.Cell>
                                    <Table.Cell><Button tooltip="Desabilitar campanha" className="button is-outlined is-info icon--button" color="danger" id={campaign._id} onClick={() => deactivate(campaign._id)}><i className="fas fa-2x fa-trash"></i></Button></Table.Cell>
                                </Table.Row>
                                ))) : (
                                    <Table.Row>
                                       <Table.Cell colSpan="4" style={{verticalAlign:'middle'}}>Nenhum registro encontrado</Table.Cell> 
                                    </Table.Row>)}
                            </Table.Body>
                        </Table> 
                </Notification>
            </Container>
        </React.Fragment>
    )
}
