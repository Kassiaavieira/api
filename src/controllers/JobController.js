const knex = require("../database/knex");

class JobController {
  async create(request, response) {
    const { title, description, tags } = request.body;
    const user_id = request.user.id;

    const job_id = await knex("job").insert({
      title, 
      description,
      user_id
    });
    const tagsInsert = tags.map(name => {
      return {
        job_id,
        name,
        user_id
      }
    });
    await knex("tags").insert(tagsInsert);
    return response.json();
  }
  async show(request, response) {
    const { id } = request.params;
    const job = await knex("job").where({ id }).first();

    const tags = await knex("tags").where({ job_id: id });

    return response.json({
      ...job,
      tags
    });
  }
  async delete(request, response) {
    const { id } = request.params;
    await knex("job").where({ id }).delete();
    return response.json();
  }
  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;
    let job;
    if(tags){
      const filterTags = tags.split(',').map(tags => tags.trim());
      job = await knex("tags")
        .select([
          "job.id",
          "job.title",
          "job.user_id"
        ])
        .where("job.user_id", user_id)
        .whereLike("job.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("job", "job.id", "tags.job_id")
        .groupBy("job.id");
    }else {
      job = await knex ("job").where({ user_id }).whereLike("title", `%${title}%`);
    }
    const userTags = await knex("tags").where({ user_id });
    const jobWithTags = job.map(job => {
      const jobTags = userTags.filter(tag => tag.job_id === job.id);
      return{
        ...job,
        tags: jobTags
      };
    });

    return response.json(jobWithTags);
  }
}
module.exports = JobController;