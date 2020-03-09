using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LunchPicker.API.Application.Models;

namespace LunchPicker.API.Application.Queries
{
    public interface IBusinessQueries
    {
        Task<IEnumerable<Business>> GetBusinessesAsync(float latitude, float longitude, int miles = 10);
        Task<IEnumerable<Business>> GetBusinessesAsync(string searchLocation, int miles = 10);
    }
}