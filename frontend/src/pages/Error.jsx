import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
function ErrorPage(){
    const error=useRouteError();
    let title='an error has occured';
    let message='Something went wrong!';

    if(error.status===500){
        // message=JSON.parse(error.data).message;
        message=error.data.message;

    }
    if(error.status===404){
        title='could not found';
        message='not found';
    }

    
    return( 
    <>
    <MainNavigation/>
    <PageContent title={title}>
    <p>{message}</p>
    </PageContent>
    </>)
}
export default ErrorPage;