const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    description: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  }
});

// static create method
jobSchema.statics.createJobPost = async function (title, type, location, description, salary, company) {
  if (!title || !type || !location || !description || !salary || !company) {
    throw Error('All fields must be filled');
  }

  if (!company.name || !company.description || !company.contactEmail || !company.contactPhone) {
    throw Error('All company fields must be filled');
  }

  const job = await this.create({ title, type, location, description, salary, company });

  return job;
}

// static edit method

// static delete method

// Ensure virtual fields are serialized
jobSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

