using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitesController(DataContext context)
        {
            _context = context;
        }
         
        [HttpGet]
        public async Task<ActionResult<IList<Activity>>>GetActivites(){
           return await _context.Activities.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>>GetActivity(Guid id){
            return await _context.Activities.FindAsync(id);
        }
    }
}