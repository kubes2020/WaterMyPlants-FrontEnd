import axios from "axios"

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem('token')

    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: "https://water-my-plants-app.herokuapp.com/api"
    })
}