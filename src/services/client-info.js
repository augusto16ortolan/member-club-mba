import { apiConfig } from "./api-config";

export default async function ClientInfo({ id }) {
    if (!id) throw new Error('ID is required');

    try {
        const clientURL = `${apiConfig.baseURL}/clients/${id}`;

        const response = await fetch(clientURL)
        const data = await response.json();

        if (!data.id) throw new Error('Client not found in database')

        return data;
    } catch (error) {
        console.log(error);
        alert('Cliente não encontrado!!!');
    }
}