const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    feedback: {
        likes:  [mongoose.Schema.Types.ObjectId],
        dislikes:  [mongoose.Schema.Types.ObjectId]
        
    }
})

postSchema.methods.updateFeedback = async function (feedbackerId, feedbackType) {
    let previousFeedbackerFeedback = null
    let previousFeedbackerPosition = null

    if (this.feedback.likes.includes(feedbackerId)) {
        previousFeedbackerFeedback = 'likes'
        previousFeedbackerPosition = this.feedback.likes.indexOf(feedbackerId)
    }

    if (this.feedback.dislikes.includes(feedbackerId)) {
        previousFeedbackerFeedback = 'dislikes'
        previousFeedbackerPosition = this.feedback.dislikes.indexOf(feedbackerId)
    }

    if (previousFeedbackerFeedback && previousFeedbackerFeedback == feedbackType) {
        let updatedData = this.feedback[feedbackType]
        updatedData.splice(previousFeedbackerPosition, 1)

        await mongoose.model('Post', postSchema).findByIdAndUpdate(this._id, {
            feedback: {
                ...this.feedback,
                [feedbackType]: updatedData
            }
        }, { new: true })
        
    }

    if (previousFeedbackerFeedback && previousFeedbackerFeedback != feedbackType) {
        let updatedData = this.feedback[previousFeedbackerFeedback]
        updatedData.splice(previousFeedbackerPosition, 1)

        await mongoose.model('Post', postSchema).findByIdAndUpdate(this._id, {
            feedback: {
                ...this.feedback,
                [previousFeedbackerFeedback]: updatedData
            }
        }, { new: true })

        let updatedData2 = this.feedback[feedbackType]
        updatedData2.push(feedbackerId)
        await mongoose.model('Post', postSchema).findByIdAndUpdate(this._id, {
            
            feedback: {
                ...this.feedback,
                [feedbackType]: updatedData2
            }
        }, { new: true })
    }

    if (!previousFeedbackerFeedback ) {

        let updatedData2 = this.feedback[feedbackType]
        updatedData2.push(feedbackerId)
        await mongoose.model('Post', postSchema).findByIdAndUpdate(this._id, {

            feedback: {
                ...this.feedback,
                [feedbackType]: updatedData2
            }
        }, { new: true })
    }
    return {
        likes: this.feedback.likes.length,
        dislikes: this.feedback.dislikes.length
    }
}

module.exports = mongoose.model('Post', postSchema)