using App.Application.Commands.Authentications;
using App.Core.Entities.Identity;
using Mapster;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text;

namespace App.Application.Mapping;

public class MappingConfigurations : IRegister
{
    public void Register(TypeAdapterConfig config)
    {

        config.NewConfig<RegisterCommand, ApplicationUser>()
            .Map(dest => dest.UserName, src => $"{src.FirstName}{src.LastName}");

    }
}
