using Diagnosis.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Domain.Models.Entites
{
    public enum RequestStatus
    {
        Peding = 0,
        Replied = 1
    }
    public class Request: BaseEntity
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }
        public RequestStatus Status { get; set; }
        public string? Reply { get; set; }
    }
}
