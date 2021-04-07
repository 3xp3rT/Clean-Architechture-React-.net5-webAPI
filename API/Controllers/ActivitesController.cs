using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitesController : BaseApiController
    {
      [HttpPost]
      public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpGet]
        public async Task<ActionResult<IList<Activity>>>GetActivites(){
           return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>>GetActivity(Guid id){

            return await Mediator.Send(new Details.Query { Id=id});
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActitvity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activitiy = activity }));
        }

    }
}