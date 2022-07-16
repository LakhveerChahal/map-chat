import { environment } from 'src/environments/environment';

export const constants = {
    defaultMapConfig: {
        style: 'mapbox://styles/mapbox/streets-v11',
        center: {
            lng: -74.5,
            lat: 40
        },
        zoom: 9,
        accessToken: environment.mapboxAccessToken,
    },
    url: {
        userUrl: 'user',
        signupUrl: 'signup',
        signinUrl: 'signin',
        signoutUrl: 'signout',
        authenticateUrl: 'authenticate',
        friendsUrl: 'friends',
        peopleUrl: 'people',
        peopleSearch: 'search',
        request: 'request',
        acceptRequest: 'accept-request',
    },
    searchText: 'searchText',
    limit: 'limit',
    offset: 'offset',
    defaultLimit: 10,
};