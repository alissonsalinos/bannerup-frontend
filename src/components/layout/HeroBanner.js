import React from 'react'
import 'rbx/index.css'
import { Hero, Title, Container } from 'rbx';

export default function HeroBanner() {
    return (
        <Hero color="primary" size="medium" style={{backgroundImage: 'url(https://s3.amazonaws.com/site.vidalink.com.br/uploads/2019/08/bg-block-rh40.jpg)', backgroundSize:'cover', backgroundPosition: 'top center'}}>
        <Hero.Body>
          <Container>
            <Title><span style={{backgroundColor: '#00d1b2', padding: '1px, 5px', borderRadius:'5px'}}>Gerenciador de Banners</span></Title>
            <Title as="h2" subtitle style={{marginTop: '-.70rem'}}>
            <span style={{backgroundColor: '#00d1b2', padding: '3px', borderRadius:'5px'}}>Crie e gerencie banners e campanhas direcionados para diferentes sites, portais e aplicativos.</span>
            </Title>
          </Container>
        </Hero.Body>
      </Hero>
    )
}
