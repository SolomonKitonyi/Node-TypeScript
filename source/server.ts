import http from 'http';
import express, {Express, response} from 'express';
import morgan from 'morgan';
import routes from './routes/posts';

const router: Express = express();

/**Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({extended: false}));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    //set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    //set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept,Authorization');
    //set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});