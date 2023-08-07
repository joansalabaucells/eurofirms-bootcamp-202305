import context from '../../context'
import deleteMeetup from '../../logic/deleteMeetup'

function DeleteMeetupModal(props) {
    console.log('DeleteMeetupModal -> render')

    const handleCancelClick = () => props.onDeleteMeetupCancelled()

    const handleSubmit = event => {
        event.preventDefault()
        
        try{
            deleteMeetup(context.token, props.meetupId)
            .then(()=> props.onMeetupDeleted())
            .catch(error=> alert(error.message))
        }catch(error){
                alert(error.message)
        }
    }

    return <div className="home-delete-meetup-modal">
        <div className="home-delete-meetup-container">
            <h2>Delete meetup</h2>

            <form className="home-delete-meetup-form" onSubmit={handleSubmit}>
                <button type="submit">Delete</button>
                <button type="button" className="home-delete-post-cancel-button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </div>
    </div>
}
export default DeleteMeetupModal