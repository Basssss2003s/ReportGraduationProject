export interface ComplaintCreate {
    firstName: string | null
    lastName: string | null
    emailAddress: string | null
    topicOfComplaint:  string | null
    detailsOfTheTopic:  string | null
    problemDetail:  string | null
    telephone: string | null 
    status:  string | null 
    createDate:  Date
    fullName: string | null
}

export interface Complaint {
    emailAddress: string | null
    topicOfComplaint:  string | null
    detailsOfTheTopic:  string | null
    problemDetail:  string | null
    status:  string | null 
    createDate:  string | null
}
