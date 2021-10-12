import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const mealSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    maxAllowed: {
      type: Number,
    },
  },
  { timestamps: true }
);

mealSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

mealSchema.plugin(mongoosePaginate);

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
