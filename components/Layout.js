import 'isomorphic-fetch'
import Link from 'next/link'
import Head from 'next/head'


export default class Layout extends React.Component{       
    render(){
        const { children, title } = this.props

        return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <header><Link href="/"><a>Podcasts</a></Link></header>
            
            { children }

            <style jsx>{`
                header{
                    color: #fff;
                    background-color: #8756ca;
                    padding: 15px;
                    text-align: center;
                }
                header a{
                    color: #fff;
                    text-decoration: none;
                }
                :global(body) {
                    background: #eee;
                    margin: 0;
                    font-family: system-ui;
                }
                h2 {
                    padding: 5px;
                    font-size: .9em;
                    font-weight: 600;
                    margin: 0;
                    text-align:center;
                }
            `}</style>
        </div>
        )
    }
}