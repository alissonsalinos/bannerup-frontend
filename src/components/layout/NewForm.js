import React,  {useState, useContext, useEffect}  from 'react'
import Axios from "axios";
import 'rbx/index.css'
import BreadCrump from './BreadCrump'
import {useHistory} from 'react-router-dom';
import ErrorNotice from "../misc/ErrorNotice";
import SuccessNotice from "../misc/SuccessNotice";
import Loading from "../misc/Loading";
import Moment from 'react-moment';
import 'moment-timezone';
import {Container, Notification } from 'rbx';
import UserContext from "../../context/UserContext";

export default function NewForm(props) {
    
    const history = useHistory();
    const {userData} = useContext(UserContext);
    let nomeUser = ''

    if(!userData.user) {
        nomeUser = ''
    } else {
        nomeUser = userData.user.displayName
    }

    

    const [id, setId] = useState(0);
    
    const [title, setTitle] = useState();
    const [pUsuarios, setPUsuarios] = useState(false);
    const [pEmpresas, setPEmpresas] = useState(false);
    const [pRedes, setPRedes] = useState(false);
    const [pInst, setPInst] = useState(false);
    const [app, setApp] = useState(false);
    const [pBnnImgUrl, setPBnnImgUrl] = useState();
    const [pBnnImgLink, setPBnnImgLink] = useState();
    const [pBnnEmbedCode, setPBnnEmbedCode] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [active, setActive] = useState();
    const [userCreator, setUserCreator] = useState();
    const [loadingBar, setLoadingBar] = useState(0);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [campaign, setCampaign] = useState();
    const [userUpdater, setUserUpdater] = useState();
    const [updateAt, setUpdateAt] = useState(0);
    let campaignData
    
    setTimeout(() => {
        setUserCreator(nomeUser)
    }, 500);

    
        console.log('tenho id:', props.id)
        const getCampaign = async () => {
            if(props.id){
                const headers = {"x-auth-token": localStorage.getItem("auth-token") }
                const oneCampaign = await Axios.get(`${process.env.REACT_APP_API_URL}/campaigns/getoneupdate/`+props.id, {headers : headers})
                setCampaign(oneCampaign.data)
                campaignData = oneCampaign.data
                
            }
        }

    const fillFields = (campaignData) => {
        if(props.id){
        let startDate = new Date(campaignData.startDate).toISOString().substring(0, 10);
        document.querySelector("#startDate").value = startDate;
        setStartDate(startDate);
        let endDate = new Date(campaignData.endDate).toISOString().substring(0, 10);
        document.querySelector("#endDate").value = endDate;
        setEndDate(endDate);
        document.querySelector("#active").value = campaignData.active;
        setActive(campaignData.active);
        if (campaignData.pBnnEmbedCode) document.querySelector("#pBnnEmbedCode").value = campaignData.pBnnEmbedCode;
        setPBnnEmbedCode(campaignData.pBnnEmbedCode);
        if (campaignData.pBnnImgLink) document.querySelector("#pBnnImgLink").value = campaignData.pBnnImgLink ;
        setPBnnImgLink(campaignData.pBnnImgLink);
        if (campaignData.pBnnImgUrl) document.querySelector("#pBnnImgUrl").value = campaignData.pBnnImgUrl;
        setPBnnImgUrl(campaignData.pBnnImgUrl);
        if(campaignData.pEmpresas === "true")
            setPEmpresas(true)
        if(campaignData.pUsuarios === "true")
            setPUsuarios(true)
        if(campaignData.pRedes === "true")
            setPRedes(true)
        if(campaignData.pInst === "true")
            setPInst(true)
        if(campaignData.app === "true")
            setApp(true)  
        if (campaignData.updatedAt) {
            setUpdateAt(1)
            let updatedAt = new Date(campaignData.updatedAt).toISOString().substring(0, 10);
            document.querySelector("#updatedAt").value = updatedAt
        }
        document.querySelector("#title").value = campaignData.title;
        setTitle(campaignData.title);             
        setUserUpdater(nomeUser)   
        setTimeout(() => {
            document.querySelector("#userCreator").value = campaignData.userCreator;    
        }, 1000); 
        
        }
    }
    
    const updateCampain = async () => {
        try {
            const updatedAt = new Date();
            const headers = {"x-auth-token": localStorage.getItem("auth-token") }
            const dataCampaign = { title, pUsuarios, pEmpresas, pRedes, pInst, app, pBnnImgUrl, pBnnImgLink, pBnnEmbedCode, startDate, endDate, active, userCreator, userUpdater, updatedAt}
            const updateData = await Axios.patch(`${process.env.REACT_APP_API_URL}/campaigns/update/`+props.id, dataCampaign, {headers: headers})
            console.log(updateData.data)
            setLoadingBar(1)
            setSuccess("Campanha atualizada com sucesso!")
            setTimeout(() => {
                setSuccess(0)
                history.push("/");
               }, 2500);

        } catch (err) {
            console.log("Error: ", err)
        }
    }

    useEffect(() => {
        if(props.id)
            getCampaign();
            setTimeout(() => {
                console.log(campaignData)
                fillFields(campaignData)
            }, 1000);
    }, [])
    
    const createCampaign = async (e) => {
        e.preventDefault();

        if(pBnnEmbedCode)
            pBnnEmbedCode.replace(/"/g, "'")

        let checkBoxes = document.getElementsByClassName( 'check' );
        let nbChecked = 0;
        for (let i = 0; i < checkBoxes.length; i++) {
            if ( checkBoxes[i].checked ) {
                nbChecked++;
            };
        };

        if(nbChecked === 0){
            setError("Selecione ao menos um destino para veiculação do banner");
            return false;
        }

        try {
           console.log('entrou') 
           const newCampaign = { title, pUsuarios, pEmpresas, pRedes, pInst, app, pBnnImgUrl, pBnnImgLink, pBnnEmbedCode, startDate, endDate, active, userCreator}
           const headers = {"x-auth-token": localStorage.getItem("auth-token") }
           await Axios.post(`${process.env.REACT_APP_API_URL}/campaigns`, newCampaign, {headers: headers}); 
           setLoadingBar(1)
           setSuccess(0)
           setSuccess("Cadastro da campanha realizado com sucesso!")
           setTimeout(() => {
            history.push("/");
           }, 2500);
        } catch (err) {
            setLoadingBar(0)
            err.response.data.msg && setError(err.response.data.msg)            
        }
    }

    return (
        <React.Fragment>
            {loadingBar === 1 && (<Loading style={{height: '146%!important', bottom: '-1500px!important' }} />)}
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            {success && ( 
                <SuccessNotice message={success} clearError={() => setError(undefined)} style={{position: 'fixed!important'}} />
            )}
            <Container fluid style={{marginTop: '15px', marginBottom: '15px'}}>
                
                <BreadCrump page={(props.id) ? "Editar Campanha" : 'Criar Campanha'}/>
            </Container>    
            <Container fluid >
                <Notification className="table__mobile">
                <div className="columns">
                <div className="column is-four-fifths">
   
                        <div className="box is-white">   
                        <div className="field">
                            <label className="label">Título</label>
                            <div className="control">
                                <input id="title" name="title" className="input is-primary" type="text" placeholder="Digite o título da campanha" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                        </div>
                        </div> 
        

       
                    <div className="box is-white">   
                        <div className="field">
                            <label className="label">Portais e App</label>
                            <div className="is-divider" data-content="Selecione os destinos para veiculação do banner."></div>
                            <div className="columns">
                                <div className="column">
                                <label className="checkbox">
                                    <input type="checkbox" id="pUsuarios" className="check" name="pUsuarios" checked={pUsuarios} onChange={() => setPUsuarios(!pUsuarios)} /> Portal Usuários
                                </label>
                                </div>
                                <div className="column">
                                <label className="checkbox">
                                    <input type="checkbox" id="pEmpresas" className="check" name="pEmpresas" checked={pEmpresas} onChange={() => setPEmpresas(!pEmpresas)} /> Portal Empresas
                                </label>
                                </div>
                                <div className="column">
                                <label className="checkbox">
                                    <input type="checkbox" id="pRedes" className="check" name="pRedes" checked={pRedes} onChange={() => setPRedes(!pRedes)} /> Portal Redes
                                </label>
                                </div>
                                <div className="column">
                                <label className="checkbox">
                                    <input type="checkbox" id="pInst" className="check" name="pInst" checked={pInst} onChange={() => setPInst(!pInst)} /> Site Institucional
                                </label>
                                </div>
                                <div className="column">
                                <label className="checkbox">
                                    <input type="checkbox" id="app" className="check" name="app" checked={app} onChange={() => setApp(!app)} /> APP
                                </label>
                                </div>
                                
                                
                            </div>
                            <div className="is-divider" data-content="Dados para os Portais e APP"></div>
                            <div className="is-divider is-divider-p" data-content="Opção 1 - URL da imagem e link destino para o banner"></div>
                        </div>
                    
                        <div className="field">
                            <label className="label">Url da imagem</label>
                            <div className="control">
                                <input id="pBnnImgUrl" name="pBnnImgUrl" className="input is-primary" type="text" placeholder="http://..." onChange={(e) => setPBnnImgUrl(e.target.value)} />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Link de destino do banner</label>
                            <div className="control">
                                <input id="pBnnImgLink" name="pBnnImgLink" className="input is-primary" type="text" placeholder="http://..." onChange={(e) => setPBnnImgLink(e.target.value)} />
                            </div>
                        </div>

                        <div className="is-divider is-divider-p" data-content="Opção 2 - EmbedCode Javascript do App BannerSnack "></div>

                        <div className="field">
                            <label className="label">BannerSnack - Embed Code</label>
                            <div className="control">
                                <textarea className="textarea is-primary is-rounded" id="pBnnEmbedCode" name="pBnnEmbedCode" placeholder="Cole o embed code (javascript) aqui" onChange={(e) => setPBnnEmbedCode(e.target.value)}></textarea>
                            </div>
                        </div>

                        


                    </div>
                    
              

                    <div className="box is-white">   
                        <div className="field">
                            <label className="label">Datas Inicial e Final / Ativação</label>
                            <div className="is-divider" data-content="Escolha a Data inicial e final de publicação."></div>
                            <div className="columns">
                                <div className="column">
                                <div className="field">
                                    <label className="label">Data Inicial</label>
                                    <div className="control">
                                        <input id="startDate" name="startDate" className="input is-primary" type="date" onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Data Final</label>
                                        <div className="control">
                                            <input id="endDate" name="endDate" className="input is-primary" type="date" onChange={(e) => setEndDate(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                    <label className="label">Ativar Banner</label>
                                        <div className="select is-rounded is-primary">
                                            <select id="active" name="active" style={{width: '180px!important'}} onChange={(e) => setActive(e.target.value)}>
                                                <option value="">Selecione uma opção abaixo</option>
                                                <option value="S">Sim           </option>
                                                <option value="N">Não           </option>
                                            </select>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                           
                        </div>
                    
                        <div className="columns">
                            <div className="column is-one-third"> 
                                <div className="field">
                                    <label className="label">Usuário criador da campanha</label>
                                    <div className="control">
                                        <input id="userCreator" name="userCreator" className="input" type="text" disabled value={(props.id) ? ('') : ( nomeUser)}/>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                        {(props.id) ? (  
                        <div className="columns">
                            <div className="column is-two-fifths"> 
                                <div className="field">
                                    <label className="label">Usuário responsável pela alteração</label>
                                    <div className="control">
                                        <input id="userUpdater" name="userUpdater" className="input" type="text" disabled value={nomeUser}/>
                                    </div>
                                </div>
                            </div>
                            {(updateAt === 1) ? (  
                                <div className="column is-two-fifths"> 
                                    <div className="field">
                                        <label className="label">Data da última alteração</label>
                                        <div className="control">
                                            <input id="updatedAt" name="updatedAt" className="input" type="date" disabled />
                                        </div>
                                    </div>
                                </div>          
                            ) : ('')}     
                        </div>
                        ) : ('')}
                        

                    </div> 

                
                </div>
                <div className="column">
                <div className="box is-white"> 
                    <h2 className="title is-4">Informações</h2>
                    <div className="block">Preencha os campos para criar uma campanha.</div>
                    <div className="block">Selecione a data inicial e final da veiculação do banner e também em quais Portais e App ele deve ser visualizados.</div>
                    <div className="block">Escolha uma das formas para cadastrar o arquivo do banner, ou via url da imagem junto com link ou o embed code javascript da aplicação <a href="https://app.bannersnack.com/" target="_blank" rel="noreferrer"><strong>BannerSnack</strong></a>, no caso do embed não é necessário o link de destino do banner.</div>
                </div>
                </div>
                </div>


                <div className="columns is-centered">
                <div className="column is-four-fifths has-text-centered">
                {(props.id) ? (     
                    <button className="button is-primary is-large is-rounded is-outlined" onClick={updateCampain}>
                        <span className="icon is-small is-left">
                        <i className="fas fa-cloud-upload-alt"></i>
                        </span>
                        Editar campanha
                    </button>
                ) : (
                    <button className="button is-primary is-large is-rounded is-outlined" onClick={createCampaign}>
                    <span className="icon is-small is-left">
                    <i className="fas fa-cloud-upload-alt"></i>
                    </span>
                     Cadastrar campanha
                    </button>
                )}
                
                
                </div>
                <div className="column"></div>
                </div>
                
                </Notification>
                

            </Container>
        </React.Fragment>        
    )
}