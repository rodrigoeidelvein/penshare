import CardPadHorizontal from "./CardPadHorizontal";

export interface Pad {
    name: string,
    image: string,
    description: string,
    author: string,
    createdAt: string,
    authorPicture: string
}

const MostPopularPads: React.FC = () => {
    const pads = [{
        name: "Trabalho de conclusão",
        image: "https://i2.wp.com/s3-sa-east-1.amazonaws.com/mundogum/wp-content/uploads/2007/10/lorem-ipsum.png?resize=348%2C287",
        description: "Lorem ipsum dolor sit amet",
        author: "Rodrigo Fazenda",
        createdAt: "07 de Abril",
        authorPicture: "https://lh5.googleusercontent.com/-yA5laxbiQg4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTmojXmXd7ZGyg7eGFNl03C3gRPA/s96-c/photo.jpg"
    }, {
        name: "Artigo sobre java",
        image: "https://i2.wp.com/s3-sa-east-1.amazonaws.com/mundogum/wp-content/uploads/2007/10/lorem-ipsum.png?resize=348%2C287",
        description: "Lorem ipsum dolor sit amet",
        author: "Samuel S",
        createdAt: "06 de Março",
        authorPicture: "https://lh4.googleusercontent.com/-lG1RidXgeag/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm3TyPXjh0shwveMqPRninm_IdWEA/s96-c/photo.jpg"
    }]


    return (<div>
        <div className="m-5 font-bold text-lg"><h1>Documentos mais populares</h1></div>
        <div className="flex">
            {pads.map(pad => <CardPadHorizontal pad={pad}/>)}
        </div>
    </div>);
};

export default MostPopularPads;
