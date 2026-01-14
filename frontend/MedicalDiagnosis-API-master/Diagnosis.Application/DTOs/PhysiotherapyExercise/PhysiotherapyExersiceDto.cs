using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Diagnosis.Application.DTOs.PhysiotherapyExercise
{
    public class PhysiotherapyExerciseDto
    {
    public int Id { get; set; }
    public string Title { get; set; }
    public string BodyPart { get; set; }
    public string Difficulty { get; set; }
    public int DurationMinutes { get; set; }
    public string YoutubeUrl { get; set; }
    public string ThumbnailUrl { get; set; }
    }}