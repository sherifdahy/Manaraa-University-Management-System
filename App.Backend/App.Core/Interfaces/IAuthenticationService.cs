using App.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.Core.Interfaces;

public interface IAuthenticationService
{
    (string refreshToken, DateTime refreshTokenExpiration) AddRefreshToken(ApplicationUser user);
}
