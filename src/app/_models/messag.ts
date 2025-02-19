export interface Message {

    id?: string | undefined
    create_at?: Date | undefined
    read_at?: Date | undefined
    sender_delete?: boolean | undefined
    recipient_delete?: boolean | undefined
    sender: string
    recipient: string
    content: string

}
