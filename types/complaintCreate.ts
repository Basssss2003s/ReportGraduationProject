export interface ComplaintCreate {
    name: string | null
    surName: string | null
    emailAddress: string | null
    topicOfComplaint:  string | null
    detailsOfTheTopic:  string | null
    problemDetail:  string | null
    telephone: string | null 
    status:  string | null 
    createDate:  Date
    fullName: string | null
}