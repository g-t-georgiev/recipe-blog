import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAuthContext } from '../../../../../contexts/AuthContext';
import useAuthActions from "../../../../../hooks/useAuthActions";

import * as favoritesService from '../../../../../services/favoritesService';

import './AddToFavorites.css';

function AddToFavorites(props) {
    const { user } = useAuthContext();
    const [ added, setAdded ] = useState(false);
    const [ render, setRender ] = useState(user.isLoggedIn);
    const { recipeId } = useParams();
    const { auth } = useAuthActions();

    useEffect(function () {
        let isActive = true;

        if (!isActive || !user.isLoggedIn) return;

        auth(user.id, recipeId || props.recipeId)
        .then(isAuthorized => {
            // console.log(isAuthorized);
            if (isAuthorized) {
                setRender(!isAuthorized);
            }

            favoritesService.checkIfAdded(user.id, recipeId || props.recipeId)
            .then(isInFavorites => {
                // console.log(isInFavorites);
                setAdded(isInFavorites);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

        return function () {
            isActive = false;
        }
    }, [props.recipeId, recipeId, auth, user.id, user.isLoggedIn]);

    const clickHandler = useCallback(async function () {
        try {
            await (added 
            ? favoritesService.removeFromFavorites(user.id, recipeId || props.recipeId)
            : favoritesService.addToFavorites(user.id, recipeId || props.recipeId));
    
            setAdded(state => !state);
        } catch (error) {
            console.log(error);
        }
    }, [added, user.id, props.recipeId, recipeId]);


    return render ? <span onClick={clickHandler} className="add-to-favorites-button">{added ? '\u2665' : '\u2661'}</span> : null;
}

export default AddToFavorites;