<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="chart-hover-discs">
		<div data-id="0" class="sun"></div>
		<xsl:for-each select="./Satellites/Planet[not(@type)]">
			<span>
				<xsl:attribute name="data-id"><xsl:value-of select="@id"/></xsl:attribute>
				<xsl:attribute name="class"><xsl:value-of select="@name"/></xsl:attribute>
			</span>
		</xsl:for-each>
	</xsl:template>

	<xsl:template name="chart-sidebar-head">
		<div class="cart-head">
			<div class="unicart-logo">
				<i class="icon-uni-cart-logo"></i>
				<h4>Universal</h4>
				<h3>Cartographics</h3>
			</div>
			<div class="game-date">
				<span>13:37</span>
				<span>4 May 3024</span>
			</div>
		</div>
	</xsl:template>

	<xsl:template name="chart-sidebar-star">
		<xsl:call-template name="chart-sidebar-head"/>
		<div class="cart-body">
			<h2><xsl:value-of select="ancestor::StarSystem/@name"/></h2>

			<div class="row">
				<span>Name</span>
				<span>
					<xsl:value-of select="@name"/>
				</span>
			</div>

			<xsl:if test="./Meta[@name='info']/@diameter">
				<div class="row">
					<span>Diameter</span>
					<span>
						<xsl:value-of select="format-number(./Meta[@name='info']/@diameter, '###,###,###')"/>
						<xsl:text> </xsl:text><i>km</i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@mass">
				<div class="row">
					<span>Mass</span>
					<span>
						<xsl:value-of select="substring-before(./Meta[@name='info']/@mass, '^')"/>
						<sup><xsl:value-of select="substring-after(./Meta[@name='info']/@mass, '^')"/></sup>
						<xsl:text> </xsl:text><i>kg</i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@gravity">
				<div class="row">
					<span>Gravity</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@gravity"/>
						<xsl:text> </xsl:text><i>m/s<sup>2</sup></i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@density">
				<div class="row">
					<span>Density</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@density"/>
						<xsl:text> </xsl:text><i>kg/m<sup>3</sup></i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@meanTemperature">
				<div class="row">
					<span>Surface Temp.</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@meanTemperature"/>
						<xsl:text> </xsl:text><i>K</i>
					</span>
				</div>
			</xsl:if>
			<xsl:if test="./Meta[@name='info']/@rotationPeriod">
				<div class="row">
					<span>Rotation</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@rotationPeriod"/>
						<xsl:text> </xsl:text><i>hours</i>
					</span>
				</div>
			</xsl:if>

			<xsl:if test="./Meta[@type='composition']">
				<div class="row">
					<span>Composition</span>
					<span>
						<xsl:for-each select="./Meta[@type = 'composition']">
							<xsl:value-of select="@element"/> 
							(<xsl:value-of select="@abbr"/>) 
							<xsl:value-of select="@percentage"/><xsl:text> </xsl:text><i>%</i>
							<br/>
						</xsl:for-each>
					</span>
				</div>
			</xsl:if>

			<xsl:if test="./Meta[@name='info']/@distanceFromParent">
				<div class="row">
					<span>Semi-major Axis</span>
					<span>
						<xsl:value-of select="format-number(./Meta[@name='info']/@distanceFromParent, '###,###,###')"/>
						<xsl:text> </xsl:text><i>km</i>
					</span>
				</div>
			</xsl:if>

			<xsl:if test="./Meta[@name='info']/@lengthOfDay">
				<div class="row">
					<span>Length Of Day</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@lengthOfDay"/>
						<xsl:text> </xsl:text><i>hours</i>
					</span>
				</div>
			</xsl:if>
			
			<xsl:if test="./Meta[@name='info']/@orbitalInclination">
				<div class="row">
					<span>Orbit Inclination</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@orbitalInclination"/>
						<xsl:text> </xsl:text><i>°</i>
					</span>
				</div>
			</xsl:if>
			
			<xsl:if test="./Meta[@name='info']/@orbitalPeriod">
				<div class="row">
					<span>Orbital Period</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@orbitalPeriod"/>
						<xsl:text> </xsl:text><i>days</i>
					</span>
				</div>
			</xsl:if>
			
			<xsl:if test="./Meta[@name='info']/@axialTilt">
				<div class="row">
					<span>Axial Tilt</span>
					<span>
						<xsl:value-of select="./Meta[@name='info']/@axialTilt"/>
						<xsl:text> </xsl:text><i>°</i>
					</span>
				</div>
			</xsl:if>

			<xsl:if test="./Meta[@name='summary']/@value">
				<h2>Summary</h2>
				<div class="summary">
					<xsl:value-of select="./Meta[@name='summary']/@value"/>
				</div>
			</xsl:if>
		</div>
	</xsl:template>

</xsl:stylesheet>