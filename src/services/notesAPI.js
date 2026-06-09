import axios from 'axios'

const API_URL = "https://bfbbqgzifzcnqxspecej.supabase.co/rest/v1/notes"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmYmJxZ3ppZnpjbnF4c3BlY2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDUwNDcsImV4cCI6MjA5NjUyMTA0N30.yZGMyANQHlHzqnvv50777mGxYgowyZyLKiTjvRIHJZU"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    }
}