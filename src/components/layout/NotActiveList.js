import React,  {useState, useEffect}  from 'react'
import Axios from "axios";
import 'rbx/index.css'
import BreadCrump from './BreadCrump'
import {useHistory} from 'react-router-dom';
import {Container, Notification, Table, Button } from 'rbx';
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
import Moment from 'react-moment';
import 'moment-timezone';
import axios from 'axios';

export default function NotActiveList() {

    const [listCampaignNot, setListCampaignNot] = useState();
    const [error, setError] = useState(0);
    const [success, setSuccess] = useState(0);
    
    const history = useHistory();
    const getCampaignsNot = async () => {
        const headers = {"x-auth-token": localStorage.getItem("auth-token") }
        const listCampaignNot = await Axios.get(`${process.env.REACT_APP_API_URL}/campaigns/allnotactive`, {headers : headers})
        setListCampaignNot(listCampaignNot.data)
        console.log(listCampaignNot.data, 've ai')
        
    }

    useEffect(() => {
        getCampaignsNot();
    }, [])
        
    const deleteCampaign = async (id) => {     
         try {
            console.log('clicou')
             const headers = {"x-auth-token": localStorage.getItem("auth-token") }
             let deleteStatus = await axios.delete(`${process.env.REACT_APP_API_URL}/campaigns/delete/${id}`, {headers: headers})
             console.log(deleteStatus.status)
             setSuccess("Campanha excluida com sucesso!")
             getCampaignsNot()
             setTimeout(() => {
                setSuccess(0)
               }, 2500);

         } catch (err) {
             console.log("Error: ", err)
         }
     }

     const activate = async (id) => {  
        try {
            const headers = {"x-auth-token": localStorage.getItem("auth-token") }
            const updateStatus = await axios.patch(`${process.env.REACT_APP_API_URL}/campaigns/updatestatus/`+id, { active: 'S' }, {headers: headers})
            console.log(updateStatus.data)
            setSuccess("Campanha reativada com sucesso!")
            getCampaignsNot()
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
                <BreadCrump page="Lista de Campanhas Desativadas"/>
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
                                <Table.Heading>&nbsp;</Table.Heading>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {listCampaignNot ? (
                                listCampaignNot.map((campaignNot, i) => (
                                <Table.Row key={i}>
                                    <Table.Cell style={{verticalAlign:'middle'}}>{campaignNot.title}</Table.Cell>
                                    <Table.Cell style={{verticalAlign:'middle'}}>
                                        {(campaignNot.pEmpresas === "true") ? "Portal Empresas" : ""}
                                        {(campaignNot.pUsuarios === "true") ? ", " : ""}
                                        {(campaignNot.pUsuarios === "true") ? "Portal Usuários" : ""}
                                        {(campaignNot.pRedes === "true") ? ", " : ""}
                                        {(campaignNot.pRedes === "true") ? "Portal Redes" : ""}
                                        {(campaignNot.pInst === "true") ? ", " : ""}
                                        {(campaignNot.pInst === "true") ? "Site Institucional" : ""}
                                        {(campaignNot.app === "true") ? ", " : ""}
                                        {(campaignNot.app === "true") ? ", APP" : ""}
                                    </Table.Cell>
                                    <Table.Cell style={{verticalAlign:'middle'}}><Moment format="DD/MM/YYYY">{campaignNot.startDate}</Moment></Table.Cell>
                                    <Table.Cell style={{verticalAlign:'middle'}}><Moment format="DD/MM/YYYY">{campaignNot.endDate}</Moment></Table.Cell>
                                    <Table.Cell><Button tooltip="Editar campanha" color="info" className="button is-outlined is-info icon--button" onClick={() => editLink(campaignNot._id)}><i className="fas edit--custom fa-2x fa-edit"></i></Button></Table.Cell>
                                    <Table.Cell><Button tooltip="Restaurar campanha" color="primary" className="button is-outlined is-primary icon--button" id={campaignNot._id} onClick={() => activate(campaignNot._id)}><i className="fas fa-2x fa-trash-restore"></i></Button></Table.Cell>
                                    <Table.Cell><Button tooltip="Excluir campanha" color="danger" className="button is-outlined is-danger icon--button" id={campaignNot._id} onClick={() => deleteCampaign(campaignNot._id)}><i className="fas fa-2x fa-times"></i></Button></Table.Cell>
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
