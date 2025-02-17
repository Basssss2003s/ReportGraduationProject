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
    id: number
    emailAddress: string | null
    topicOfComplaint:  string | null
    detailsOfTheTopic:  string | null
    problemDetail:  string | null
    status:  string | null 
    createDate:  string | null
}

export interface GetComplaint {
    id: number
    firstName: string | null
    lastName: string | null
    emailAddress: string | null
    topicOfComplaint:  string | null
    detailsOfTheTopic:  string | null
    problemDetail:  string | null
    telephone: string | null 
    status:  string | null 
    createDate: Date | null;
    fullName: string | null
    stageStatus: StatusComplaint[]
}

export interface StatusComplaint{
    id: number,
    state: string ,
    createDate: Date ,
    complaintId: string
}

