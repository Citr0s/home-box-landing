﻿using System.ComponentModel.DataAnnotations;

namespace HomeBoxLanding.Api.Features.FuelPricePoller.Types;

public class FuelPriceRecord
{
    [Key]
    public Guid Identifier { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Postcode { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Brand { get; set; }
    public FuelProvider Provider { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Petrol_E5_Price { get; set; }
    public double Petrol_E10_Price { get; set; }
    public double Diesel_B7_Price { get; set; }
}