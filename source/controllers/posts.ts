import {Request,Response,NextFunction} from 'express';
import axios,{AxiosResponse} from 'axios';

interface Post  {
    userId: Number,
    id: Number,
    title: String,
    body: String,
};

//getting all posts
const getPosts = async(req:Request, res: Response,next: NextFunction) => {
    //get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let posts: [Post] = result.data;
    return res.status(200).json({
        message: posts
    });
};

//getting a single post
const getPost = async(req: Request, res: Response, next: NextFunction) => {
    //get the post id from the req
    let id: string = req.params.id;
    //get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    let post: Post = result.data;
    return res.status(200).json({
        message: post
    });
};

//updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    //get the post id from req.params
    let id: string = req.params.id;
    //get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    //update the post
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && {title}),
        ...(body && {body})
    });
    //return response
    return res.status(200).json({
        message: response.data
    });
};

//deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    //get the id of the post from req.params
    let id: string = req.params.id;
    //delete the post
    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/${id}`);
    //return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};