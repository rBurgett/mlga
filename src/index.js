import express from 'express';
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import favicon from 'serve-favicon';
import cors from 'cors';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import React from 'react';

import Layout from './components/layout';
import Home from './components/home';
import About from './components/about';
import Webcast from './components/webcast';
import Contact from './components/contact';

const indexHTML = fs.readFileSync('index.html', 'utf8');

const render = ({ title, description, type = 'website', url = '', component }) => {

    description = description ? description : 'This is a podcast blah blah blah.';

    url = 'https://makelibertygreatagain.net/' + url;
    const appId = process.env.fbAppId | '';

    const image = 'https://makelibertygreatagain.net/image.png';

    const tags = `
        <title>${title}</title>
        <meta name="description" content="${description}" />
        
        <!-- Open Graph -->
        <meta property="og:site_name" content="Make Liberty Great Again Podcast" />
        <meta property="og:type" content="${type}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:image:width" content="1132" />
        <meta property="og:image:height" content="1132" />
        <meta property="fb:app_id" content="${appId}" />
        
        <!-- Twiter -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:url" content="${url}" />
        <meta name="twitter:image" content="${image}" />
    `;
    return indexHTML
        .replace('{{title}}', title)
        .replace('{{metaTags}}', tags)
        .replace('{{body}}', renderToString(
            <Layout>
                {component}
            </Layout>
        ));
};

const app = express()
    .enable('trust proxy')
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(multipart({
        autoFiles: false
    }))
    .use(favicon('./public/favicon.ico'))

    .get('/', (req, res) => {
        res.send(render({
            title: 'Home',
            component: (
                <Home />
            )
        }));
    })
    .get('/about', (req, res) => {
        res.send(render({
            title: 'About',
            component: (
                <About />
            )
        }));
    })
    .get('/webcast', (req, res) => {
        res.send(render({
            title: 'Webcast',
            component: (
                <Webcast />
            )
        }));
    })
    .get('/contact', (req, res) => {
        res.send(render({
            title: 'Contact',
            component: (
                <Contact />
            )
        }));
    })

    .use(express.static('public'))
    .get('*', (req, res) => res.sendStatus(404));

const port = process.env.PORT || 3300;

const server = app.listen(port, () => {
    console.log('App listening at port', server.address().port);
});
