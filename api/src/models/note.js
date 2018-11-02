import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';
import autopopulate from 'mongoose-autopopulate';

export const NoteSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		episode: {
			type: Schema.Types.ObjectId,
			ref: 'Episode',
		},
		article: {
			type: Schema.Types.ObjectId,
			ref: 'Article',
		},
		start: {
			type: Number,
			required: true,
		},
		end: {
			type: Number,
			required: true,
		},
		// text===null? it's a highlight : it's a note
		text: {
			type: String,
			trim: true,
		},
	},
	{
		collection: 'notes',
	},
);

NoteSchema.index({ user: 1, article: 1 }, { index: true });
NoteSchema.index({ user: 1, episode: 1 }, { index: true });

NoteSchema.plugin(timestamps, {
	createdAt: { index: true },
	updatedAt: { index: true },
});
NoteSchema.plugin(mongooseStringQuery);
NoteSchema.plugin(autopopulate);

module.exports = exports = mongoose.model('Note', NoteSchema);
