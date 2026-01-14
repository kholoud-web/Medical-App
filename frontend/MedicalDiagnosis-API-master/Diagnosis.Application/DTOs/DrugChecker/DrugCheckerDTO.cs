using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.DrugChecker
{
    public class DrugCheckerResponceDTO
    {
        public string Dosage { get; set; }
        public string Age { get; set; }
        public string Interactions { get; set; }
        public string Contraindications { get; set; }
        public SideEffectInfo SideEffects { get; set; }
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
    }

    public class SideEffectInfo
    {
        public string Common { get; set; }

        public string Serious { get; set; }
    }

    public class DrugCheckerRequestDTO
    {
        public string DrugName { get; set; }
       
    }
    public class DrugSuggestionDTO
    {
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public bool Success { get; set; } = true;
        public string ErrorMessage { get; set; }
    }


}