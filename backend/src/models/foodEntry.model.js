import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const foodEntrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal',
    },
  },
  { timestamps: true }
);

foodEntrySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

foodEntrySchema.plugin(mongoosePaginate);

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

export default FoodEntry;
